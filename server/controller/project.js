const {User, Todo, ProjectUser, Project} = require('../models');

class ProjectController {
  static getAll(req, res, next) {
    ProjectUser.findAll({ 
      where: {UserId: req.user.sub},
      include: [
        {
          model: Project,
          include: [Todo, User]
        },
        User
      ]
    })
      .then(result => {
        if (result.length) {
          return res.status(200).json(result);
        }
        res.status(200).send('You dont have projects');
      })
      .catch(err => next(err));
  }

  static create(req, res, next) {
    let projectResult
    Project.create({
      name: req.body.name
    })
      .then(project => {
        projectResult = project
        return ProjectUser.create({
          UserId: req.user.sub, 
          ProjectId: project.id
        });
      })
      .then(result => {
        res.status(201).json({result, projectResult});
      })
      .catch(err => next(err));
  }

  static getOne(req, res, next) {
    ProjectUser.findOne({
      where: {
        ProjectId: req.params.id
      }, 
      include: [
        {
          model: Project,
          include: [Todo, User]
        },
        User
      ]
    })
      .then(project => {
        if (!project) {
          throw new Error('Project not found')
        }
        res.status(200).json(project)
      })
      .catch(err => next(err));
  }
  
  static update(req, res, next) {
    ProjectUser.findOne({ where: {id: req.params.id}})
      .then(project => {
        if (!project) {
          throw new Error('Project not found');
        }
        return ProjectUser.create({
          ProjectId: req.params.id,
          UserId: req.body.user,
          name: req.body.name || project.name
        });
      })
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => next(err));
  }
}

module.exports = ProjectController