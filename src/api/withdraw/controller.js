const withdrawController = app => {
    app.route('account/withdraw').post((req, res) => {
        res.status(200).send("saveWithdraw");
    });
}

export default withdrawController;