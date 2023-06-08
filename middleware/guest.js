const guest = (req,res,next)=> {
    if(!req.isAuthenticated()){
        res.redirect('/login');
    }
   return next();
}

export default guest;