const auth = (req,res,next)=> {
    if(!req.isAuthenticated()){
        return next();
       
    }
    res.redirect('/profile');
}

export default auth;