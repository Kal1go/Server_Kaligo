const {UserModel} = require('./user.model');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        content: await UserModel.find(),
        message: 'Usuários encontrados!',
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },
  create: async (req, res, next) => {
    try {
      const body = req.body || {};
      const previusUser = await UserModel.findOne({email: body.email});
      if (previusUser) {
        return res.status(402).json({
          success: false,
          message: 'E-mail já cadastrado!',
        });
      }
      const user = await new UserModel(body);
      await user.save();

      return res.json({
        success: true,
        message: 'Pessoa criada com successo!',
        content: user,
      });
    } catch (error) {
      res.status(402).json({
        success: false,
        message: error.message,
      });
    }
  },
  deleteByID: async (req, res, next) => {
    const params = req.params || {};
    try {
      if (!params.id) {
        throw new Error('Id is required');
      }
      res.json({
        success: true,
        content: await UserModel.findByIdAndDelete(params.id),
      });
    } catch (error) {
      res.status(402).json({
        success: false,
        message: error.message,
      });
    }
  },
  deleteMany: async (req, res, next) => {
    try {
      res.json({
        success: true,
        content: await UserModel.deleteMany({}),
      });
    } catch (error) {
      res.status(402).json({
        success: false,
        message: error.message,
      });
    }
  },
  authenticate: async (req, res, next) => {
    const body = req.body || {};
    const appleID = body.appleID;

    try {
      const user = await UserModel.findOne({appleID});

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não encontrado!',
        });
      }

      return res.json({
        success: true,
        content: user,
      });
    } catch (error) {
      return next(error);
    }

    return;
  },
};
