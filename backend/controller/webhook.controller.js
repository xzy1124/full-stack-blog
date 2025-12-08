import User from '../models/user.model.js'
import { Webhook } from 'svix'
export const clerkWebHook = async (req, res) => {
    console.log('webhook called');
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOKS_SECRET
    if(!WEBHOOK_SECRET) {
        throw new Error("WEBHOOK_SECRET is not set")
    }
    const payload = req.body;
    const headers = req.headers;
    let evt;
    // debug signature and raw body to help troubleshoot different provider payloads
    try {
        const sig = headers['svix-signature'] || headers['Svix-Signature'] || headers['svix_signature'];
        console.log('svix-signature header:', sig);
        if (payload && typeof payload !== 'string') {
            try { console.log('raw payload:', payload.toString()); } catch (e) { /* ignore */ }
        } else {
            console.log('raw payload (string):', payload);
        }
    } catch (e) {
        console.warn('Failed to log raw payload/signature:', e);
    }

    try {
        const wh = new Webhook(WEBHOOK_SECRET);
        evt = wh.verify(payload, headers);
        console.log('evt after verify:', evt);
        if (evt && evt.data) {
            console.log('evt.data:', evt.data);
        }
    } catch (err) {
        console.error('Webhook verify error:', err);
        res.status(400).json({ message: "Webhook verification failed" });
        return;
    }

    const data = evt.data || {};

    // 只在用户创建事件时插入数据库，其他事件忽略
    if (evt.type !== 'user.created') {
        console.log('Ignoring non-user.created event:', evt.type);
        return res.status(200).json({ message: 'Ignored event', type: evt.type });
    }
    // robust email extraction for Google/GitHub/etc.
    let email = '';
    if (Array.isArray(data.email_addresses) && data.email_addresses.length > 0) {
        email = data.email_addresses[0].email_address || '';
    }
    if (!email && Array.isArray(data.external_accounts) && data.external_accounts.length > 0) {
        email = data.external_accounts[0].email_address || data.external_accounts[0].email || '';
    }
    if (!email && typeof data.email === 'string') {
        email = data.email;
    }

    // username fallback: data.username -> external_accounts.username -> local-part of email -> generated id
    let username = data.username || '';
    if (!username && Array.isArray(data.external_accounts) && data.external_accounts.length > 0) {
        username = data.external_accounts[0].username || '';
    }
    if (!username && email) {
        username = email.split('@')[0];
    }
    if (!username) {
        username = `user_${data.id}`;
    }

    const img = data.image_url || data.profile_image_url || data.profile_ima_url || (Array.isArray(data.external_accounts) && data.external_accounts.length > 0 ? (data.external_accounts[0].avatar_url || data.external_accounts[0].image_url) : '') || '';

    if (!email) {
        console.warn('Webhook user.created missing email, skipping save', { data });
        return res.status(400).json({ message: 'Missing email in webhook user.created' });
    }

    const newUser = new User({
        clerkId: data.id,
        username,
        email,
        img,
    });

    try {
        await newUser.save();
        console.log('Saved new user from webhook:', data.id);
        return res.status(200).json({ message: "Webhook received" });
    } catch (saveErr) {
        if (saveErr && saveErr.code === 11000) {
            console.warn('User save conflict (duplicate), treating as existing user:', saveErr.keyValue || saveErr);
            return res.status(200).json({ message: 'User already exists', info: saveErr.keyValue || null });
        }
        console.error('Failed to save new user from webhook:', saveErr);
        return res.status(500).json({ message: 'Failed to save user', error: String(saveErr) });
    }
}