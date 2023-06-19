const is_admin = (req,res,next) => {
    const userType = req.user.userType;
    if(userType == 1){
       return next();
    }
    res.redirect('/');
}

export default is_admin;