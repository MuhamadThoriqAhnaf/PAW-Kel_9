import eror from '../assets/404.png';


const NotFound = () => {
    return ( 
    <div class="flex items-center">
        <img src={eror} alt='' class='h-96 md: px-20 flex-auto'/>
        <div className="flex-auto md:pt-56 px-28 h-screen">
            <div class="   text-7xl font-bold"> 404 </div>
            <div className=" mx-auto  text-2xl font-bold">Sorry, you've found a page that doesnt exist 😞</div>
        </div>
    </div>
     );
}
 
export default NotFound;