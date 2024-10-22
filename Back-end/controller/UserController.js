import dbClient from '../utils/db.js';
import sha1 from 'sha1';
import jsonwebtoken from 'jsonwebtoken';
import redisClient from '../utils/redis.js';

// make auto increment to db
let USERS = 0;

// create token for all for making session with user
export async function createToken(email, id) {
  // get the secret key from the env
	const jwtSecretKey = process.env.JWT_SECRET_KEY;

	// define data
	const data = {
		email
	}
	const duration = 7 * 24 * 60 * 60;
	// create token
	const token = jsonwebtoken.sign(data, jwtSecretKey, {
		expiresIn: duration
	});
	await redisClient.set(token, id, duration);
	return token;
}

export async function createUser(req, res) {
  // fields should have value
  const requiredFields = [
    { field: 'email', errorMessage: 'Missing Email' },
    { field: 'password', errorMessage: 'Missing Password' },
    { field: 'name', errorMessage: 'Missing Name' },
    { field: 'phone', errorMessage: 'Missing Phone' },
    { field: 'whatsapp', errorMessage: 'Missing Whatsapp' },
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
  if (!emailRegex.test(email)) {
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
  if (!whatsappRegex.test(whatsapp)) {
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
    hashedPass,
    points: 0,
  });

  // create token to make session to make user stay logged in
  const token = await createToken(email, USERS);

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

export async function getUser (req, res) {
  const { phone } = req.params;

  if (!phone) {
    return res.status(400).json({ error: 'no phone number' });
  }

  const user = await dbClient.client.db(dbClient.database).collection('user').findOne({
    phone,
  });

  return res.status(200).json({user});
}
