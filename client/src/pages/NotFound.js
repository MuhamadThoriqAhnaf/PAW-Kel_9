import eror from '../assets/404.png';


const NotFound = () => {
    return ( 
    <div class="place-content-center h-screen grid grid-row-2 sm:grid-col-2">
        <img src={eror} alt='' class='h-[400px]  p-20'/>
        <div className="">
            <div class="font-rubik text-2xl sm:text-4xl md:text-7xl font-bold px-10">404 Not Found</div>
            <div className="mx-auto text-2xl font-rubik px-10 mb-10">Sorry, you've found a page that doesnt exist 😞</div>
        </div>
    </div>
     );
}
 
export default NotFound;