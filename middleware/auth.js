// const auth = (req,res,next)=> {
//     if(!req.isAuthenticated()){
//         return next();
       
//     }
//     res.redirect('/profile');
// }

// export default auth;
 const ensureAuthenticated =  (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/login');
    };

    const forwardAuthenticated = (req, res, next) => {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/profile');     
    }
    export {ensureAuthenticated, forwardAuthenticated }