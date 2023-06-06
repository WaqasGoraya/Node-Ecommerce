class homeController {
        static index = (req,res)  => {
            res.render('pages/home',{title:'Home'});
        }
        static about = (req,res) => {
            res.render('pages/about',{title:'About'});
        }
        static store = (req,res) => {
            res.render('pages/store',{title:'Shop'});
        }
        static contact = (req,res) => {
            res.render('pages/contact',{title:'Contact'});
        }
}
export default homeController;