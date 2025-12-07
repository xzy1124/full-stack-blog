import Image from './Image'
import { Link } from 'react-router-dom';
const FeaturedPosts = () => {
  return (
    // 缩小垂直，扩大左一个大的右三个小的
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* first post */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* image */}
        <Image src='featured1.jpeg' className='rounded-3xl object-cover' alt='featured1'/>
        {/* details */}
        <div className='flex items-center gap-4'>
            <h1 className='font-semibold lg:text-lg'>01.</h1>
            <Link className='text-blue-800 lg:text-lg'>Web Design</Link>
            <span className='text-gray-500'>2 days ago</span>
        </div>
        {/* title */}
        <Link to='/test' className='text-lg lg:text-3xl font-semibold lg:font-bold'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </Link>
      </div>
      {/* other posts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* second */}
        <div className='lg:h-1/3 flex justify-between gap-4'>
            {/* image */}
            <Image 
                src='featured2.jpeg' 
                className='rounded-3xl object-cover w-1/3' 
                alt='featured2'
            />
        
            {/* detail and title */}
            <div className='w-2/3'>
                <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
                    <h1 className='font-semibold '>02.</h1>
                    <Link className='text-blue-800'>Web Design</Link>
                    <span className='text-gray-500 text-sm'>2 days ago</span> 
                </div>
                <Link
                    to="/text"
                    className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'
                >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </Link>
            </div>
        </div>
        {/* third */}
        <div className='lg:h-1/3 flex justify-between gap-4'>
            {/* image */}
            <Image
                src='featured3.jpeg'
                className='rounded-3xl object-cover w-1/3'
                alt='featured3'
            />

            {/* detail and title */}
            <div className='w-2/3'>
                <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
                    <h1 className='font-semibold '>03.</h1>
                    <Link className='text-blue-800'>Web Design</Link>
                    <span className='text-gray-500 text-sm'>2 days ago</span>
                </div>
                <Link
                    to="/text"
                    className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'
                >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </Link>
            </div>
        </div>
        {/* four */}
        <div className='lg:h-1/3 flex justify-between gap-4'>
            {/* image */}
            <Image
                src='featured4.jpeg'
                className='rounded-3xl object-cover w-1/3'
                alt='featured4'
            />

            {/* detail and title */}
            <div className='w-2/3'>
                <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
                    <h1 className='font-semibold '>04.</h1>
                    <Link className='text-blue-800'>Web Design</Link>
                    <span className='text-gray-500 text-sm'>2 days ago</span>
                </div>
                <Link
                    to="/text"
                    className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'
                >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturedPosts;