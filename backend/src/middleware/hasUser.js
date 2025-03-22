const hasUser = async (req, res, next) => {
    const email = req?.session?.user?.email;

    if (!email) {
        return res.status(400).json({ message: 'unauthorized!' });
    };

    next();
};