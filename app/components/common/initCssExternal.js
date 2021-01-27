import $ from "jquery";
const initCssExternal = () => {
//  (function(){
    // alert('init css')
    const arrCss = [
        '/css/style.css',
        "/css/reset.css",
        '/css/respon.css',
        "/css/swiper-bundle.min..css"
    ];
    $('link[title="css-5"]').remove();
    arrCss.forEach((item) => {
        const head = document.head;
        let link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = item;
        head.appendChild(link);
    })
//  })()

}
export default initCssExternal
