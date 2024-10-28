import dbClient from '../utils/db.js';
import sha1 from 'sha1';
import jsonwebtoken from 'jsonwebtoken';
import redisClient from '../utils/redis.js';
import { ObjectId } from 'mongodb';

// make auto increment to db
let USERS = 0;

// create token for all for making session with user
export async function createToken(phone, id) {
  // get the secret key from the env
	const jwtSecretKey = process.env.JWT_SECRET_KEY;

	// define data
	const data = {
		phone
	}
	const duration = 7 * 24 * 60 * 60;
	// create token
	const token = jsonwebtoken.sign(data, jwtSecretKey, {
		expiresIn: duration
	});
	await redisClient.set(token, id, duration);
	return token;
}

export async function getTokenFromAuth(Auth) {
  // check Auth
  if (!Auth) {
    throw new Error('No Authorization');
  }

  // check Bearer
  if (Auth.slice(0, 7) !== 'Bearer ') {
		throw new Error('Header should contain Bearer');
	}

  // remove Bearer
  const token = Auth.replace('Bearer ', '');
  return token;
}

export async function getUserFromAuth(Auth) {

  const token = await getTokenFromAuth(Auth);

  // check validation
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  let phone;

  try {
    const verified = jsonwebtoken.verify(
      token,
      jwtSecretKey
    );

    if (verified) {
      phone = verified.phone;
    }

    const currentTime = Math.floor(Date.now() / 1000);
		if (verified.exp < currentTime) {
			throw new Error('token Expired');
		}

  } catch (err) {
    throw new Error(err);
  }

  if (!phone) {
    throw new Error('incorrect Auth');
  }

  const user = await dbClient.client.db(dbClient.database).collection('user').findOne({
    phone,
  });
  
  if (!user) {
    throw new Error ('no User');
  }

  return user;
}

export async function getUserById(id) {
  if (!id) {
    throw new Error('No id number');
  }

  // convert it to a number for the query
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error('Invalid id format, must be a number');
  }

  // Query the database for the user by numeric id
  const user = await dbClient.client.db(dbClient.database).collection('user').findOne({
    _id: numericId,
  });

  // Check if user is found
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return user
}

export async function createUser(req, res) {
  // fields should have value
  const requiredFields = [
    { field: 'password', errorMessage: 'Missing Password' },
    { field: 'name', errorMessage: 'Missing Name' },
    { field: 'phone', errorMessage: 'Missing Phone' },
    { field: 'address', errorMessage: 'Missing Address' }
  ];
  
  let variables = {};
  
  // check each field has value
  for (const { field, errorMessage } of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({ error: errorMessage });
    }
    variables[field] = req.body[field];
  }
  
  // get each value in it's field
  const { email, password, name, phone, whatsapp, address } = variables;

  // check that phone number is unique
  const user = await dbClient.client.db(dbClient.database).collection('user').findOne({
    phone,
  });

  if (user) {
    return res.status(400).send({ error: 'Phone number Aready exists' });
  }

  // check email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email && !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email not valid' });
  }

  // check password contain at least 4 chars;
  const passRegex = /^.{4,}$/;
  if (!passRegex.test(password)) {
    return res.status(400).json({ error: 'Password should at least 4 digits' });
  }

  // check phone number is valid
  const phoneRegex = /^01\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Phone number should be 11 digits and start with 01' });
  }

  // check for valid whatsapp number
  const whatsappRegex = /^01\d{9}$/;
  if (whatsapp && !whatsappRegex.test(whatsapp)) {
    return res.status(400).json({ error: 'whatsapp number should be 11 digits and start with 01' });
  }

  // hash the password in the db
  const hashedPass = sha1(password);

  // insert user in the db
  USERS += 1;
  await dbClient.client.db(dbClient.database).collection('user').insertOne({
    _id: USERS,
    name,
    phone,
    whatsapp,
    address,
    email,
    password: hashedPass,
    points: 0,
  });

  // create token to make session to make user stay logged in
  const token = await createToken(phone, USERS.toString());

  return res.status(201).json({
    token: token,
    user: {
      id: USERS,
      name,
      phone,
      email,
      hashedPass,
      address,
      whatsapp,
    }
  });
}

export async function getUser(req, res) {
  const { id } = req.params;

  const user = await getUserById(id);

  // Return the user data
  return res.status(200).json({ user });
}


export async function deleteUser(req, res) {
  let Authorization = req.header('Authorization');

  if (!Authorization) {
    res.status(400).json({ error: 'no Authorization' });
  }

  // get the user
  let user;
  try {
    user = await getUserFromAuth(Authorization);
  } catch (err) {
    res.status(400).json({ error: err });
  }

  // get the token
  let token;
  try{
    token = await getTokenFromAuth(Authorization);
  } catch (err) {
    res.status(400).json({ error: err });
  }

  await redisClient.del(token);
  await dbClient.client.db(dbClient.database).collection('user').deleteOne({
    _id: user._id,
  });

  return res.status(200).send('user deleted successfully');
}

export async function getMe(req, res) {
  let Authorization = req.header('Authorization');
  
  if (!Authorization) {
    res.status(400).json({ error: 'no Authorization' });
  }

  // get the user
  let user;
  try {
    user = await getUserFromAuth(Authorization);
  } catch (err) {
    res.status(400).json({ error: err });
  }

  return res.status(200).json({ user });
}

export async function updatePoints(req, res) {
  const { points, id } = req.body;

  if (!points) {
    res.status(400).send('Missing Points');
  }

  if (!id) {
    res.status(400).send('Missing id');
  }

  const user = await getUserById(id);

  await dbClient.client.db(dbClient.database).collection('user').updateOne(
    { _id: user._id },
    { $inc: {points: parseInt(points)} },
  );

  return res.status(200).send('points added successfully');
}

export async function login (req, res) {
  const { phone, password } = req.body;

  if (!phone) {
    return res.status(400).send('Missing phone');
  }

  if (!password) {
    return res.status(400).send('Missing password');
  }

  const user = await dbClient.client.db(dbClient.database).collection('user').findOne({
    phone,
  });

  if (!user) {
    return res.status(400).send('User not found');
  }

  const hashed_pass = sha1(password);

  if (user.password !== hashed_pass) {
    return res.status(400).send('Incorrect password');
  }

  const token = await createToken(phone, user._id.toString());

  return res.status(200).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      whatsapp: user.whatsapp,
      phone: user.phone,
      address: user.address,
    }
  });
}

export async function logout(req, res) {
  let Authorization = req.header('Authorization');
  
  if (!Authorization) {
    return res.status(400).json({ error: 'no Authorization' });
  }

  let token;
  try{
    token = await getTokenFromAuth(Authorization);
  } catch (err) {
    return res.status(400).json({ error: err });
  }

  await redisClient.del(token);
  return res.status(200).send('logged out successfully');
}
