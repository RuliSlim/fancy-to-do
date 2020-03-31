const errorHandler = (err, req, res, next) => {
  console.log(err, 'IKI MESSAGE');
  console.log(err.message, 'IKI MESSAGE');
  if (err.name == 'SequelizeValidationError') {
    return res.status(400).json(err);
  } 
  
  if (err.message === ('Todo not found' || 'User not found')) {
    return res.status(404).json({error: err.message});
  } 
  
  if (typeof err.message === 'string') {
    return res.status(400).json({error: err.message});
  }
  
  console.log('masuk 5000');
  return res.status(500).json(err);
}

module.exports = errorHandler