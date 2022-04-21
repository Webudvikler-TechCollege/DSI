import UserModel from "../Models/user.model.js";
import TeamModel from "../Models/team.model.js";
import UserGroupModel from "../Models/usergroup.model.js";

// En til mange relation til teams
TeamModel.hasMany(UserModel, { foreignKey: 'team_id'});
UserModel.belongsTo(TeamModel, { foreignKey: 'team_id'});

// Mange til mange relation til usergroups
UserModel.belongsToMany(UserGroupModel, {
  through: "usergroup_rel",
  foreignKey: "user_id"
});

class UserController {
  constructor() {}

  list = async (req, res) => {
    const result = await UserModel.findAll({
      order: ["firstname"],
      // Inkluderer relationsdata - sættes i array når der er flere
      include: [ 
        {
          // Team
          model: TeamModel,
          attributes: ["name"] // Attributter er de felter
        },
        {
          // Usergroups
          model: UserGroupModel,
          attributes: ["id", "name"]
        }
      ]
    });
    res.send(result);
  };

  get = async (req, res) => {
    try {
      const result = await UserModel.findAll({ 
        where: { id: req.params.id },
        include: [ 
          {
            // Team
            model: TeamModel,
            attributes: ["name"] // Attributter er de felter
          },
          {
            // Usergroups
            model: UserGroupModel,
            attributes: ["id", "name"]
          }
        ]  
      });
      return res.json(result);
    } catch (err) {
      return res.send(err);
    }
  };

  create = async (req, res) => {
    const { firstname, lastname, email, password, team_id } = req.body;

    if (firstname && lastname && email && password && team_id) {
      const model = await UserModel.create(req.body);
      return res.json({ newid: model.id });
    } else {
      return res.send(418);
    }
  };

  update = async (req, res) => {
    const { firstname, lastname, email, password, team_id, id } = req.body;

    if (firstname && lastname && email && password && id) {
      await UserModel.update(req.body, { where: { id: id } });
      return res.sendStatus(200);
    } else {
      return res.send(418);
    }
  };

  delete = async (req, res) => {
    try {
      await UserModel.destroy({ where: { id: req.params.id } });
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  };
}

export default UserController;
