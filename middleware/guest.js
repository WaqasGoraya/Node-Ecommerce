const guest = (req,res,next)=> {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

export default guest;