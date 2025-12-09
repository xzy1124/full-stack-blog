import {IKImage} from 'imagekitio-react'
const Image = ({src, className, alt, w, h}) => {
    // if (!src) return null // 空值保护
    // const cleanPath = src.startsWith('/') ? src.slice(1) : src
    // console.log('原始 src:', src, 'cleanPath:', cleanPath)
    return (
        <IKImage 
            urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
            path={src}  // 去掉开头 / 
            className={className} 
            loading='lazy'
            lqip={{active: true, quality: 20}}
            alt={alt} 
            width={w}
            height={h}
            // 自定义图片的宽高
            transformation={[
                {
                    width: w,
                    height: h,
                }
            ]}
        />
    )
}
export default Image