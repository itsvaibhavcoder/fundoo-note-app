import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('GET /users', () => {
    it('should return empty array', (done) => {
      request(app.getApp())
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.data).to.be.an('array');

          done();
        });
    });
  });
});

// import { expect } from 'chai';
// import request from 'supertest';
// import mongoose from 'mongoose';
// import HttpStatus from 'http-status-codes';
// import app from '../../src/index';
// import dotenv from 'dotenv';
// dotenv.config();

// const TEST_DATABASE = process.env.DATABASE_TEST || 'mongodb://localhost:27017/testdb';

// describe('User API Test', ()=>{
//   before((done)=>{
//     mongoose.connect(TEST_DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(()=>done())
//     .catch((err)=>done(err))
//   });

//   after(async()=>{
//     await mongoose.connection.close();
//   });

//   //Test case for user registration
//   describe('POST/signup', ()=>{
//     it('given new user when added should return status 201', (done)=>{
//       const userDetails = {
//         firstName: "Vaibhav",
//         lastName: "Sukale",
//         email: "vsukale@gmail.com",
//         password: "vaibhav@123"
//       };

//       request(app)
//       .post('/api/v1/users/signup')
//       .send(userDetails)
//       .end((err, res)=>{
//         expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
//         expect(res.body).to.have.property('message', 'Email already exists')
//         done();
//       });
//     });
//   });

//   // Test case for Successful Login
//   describe('POST/login', () => {
//     it('should log in a user', (done) => {
//       const loginDetails = {
//         email: "vsukale@gmail.com",
//         password: "vaibhav@123"
//       };
  
//       request(app)
//         .post('/api/v1/users/login')
//         .send(loginDetails)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(HttpStatus.OK); 
//           expect(res.body).to.have.property('message', 'Login successful');
//           expect(res.body).to.have.property('token'); 
//           done();
//         });
//     });
  
//     //Test case for Failed Login with Wrong Credentials
//     it('should return 401 for invalid credentials', (done) => {
//       const invalidLoginDetails = {
//         email: "invalid@gmail.com",
//         password: "wrongpassword"
//       };
  
//       request(app)
//         .post('/api/v1/users/login')
//         .send(invalidLoginDetails)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED); 
//           expect(res.body).to.have.property('message', 'Invalid email or password');
//           done();
//         });
//     });
//   });

//   //Test case for forget-password
//   describe('POST/forget-password', () => {
//     it('should send the token to user email', (done) => {
//       const userEmail = {
//         email: "vsukale@gmail.com"
//       };
  
//       request(app)
//         .post('/api/v1/users/forget-password')
//         .send(userEmail)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(HttpStatus.OK); 
//           expect(res.body).to.have.property('message', 'Token sent successfully');
//           expect(res.body).to.have.property('token'); 
//           done();
//         });
//     });
  
//     //Test case failed for invalid email
//     it('should return 404 if user not found', (done) => {
//       const invalidEmail = {
//         email: "invalid@gmail.com"
//       };
  
//       request(app)
//         .post('/api/v1/users/forget-password')
//         .send(invalidEmail)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(HttpStatus.NOT_FOUND); 
//           expect(res.body).to.have.property('message', 'User not found');
//           done();
//         });
//     });
//   });

//   describe('POST /api/v1/notes', ()=>{
//     it('should create a new note successfully', (done)=>{
//       const newNote = {
//         title: "My new Note",
//         Description: "This is content of new note",
//         color: "Red",
//         isArchived: true,
//         isTrash: false,
//         UserID: "user12346"
//       };
//       request(app)
//       .post('api/v1/notes')
//       .send(newNote)
//       .end((err, res)=>{
//         expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
//         expect(res.body).to.have.property('message', 'Note created successfully');
//         expect(res.body).to.have.property('note');
//         expect(res.body.note).to.have.property('title', 'My New Note');
//         expect(res.body.note).to.have.property('Description', 'This is content of new note');
//         expect(res.body.note).to.have.property('color', 'Red');
//         expect(res.body.note).to.have.property('isArchived', 'true');
//         expect(res.body.note).to.have.property('isTrash', 'false');
//         expect(res.body.note).to.have.property('UserID', 'user12346');
//       })
//     })
//   })
 
//    // Test for creating a note with missing required fields
//    it('should return 400 for missing required fields', (done) => {
//     const incompleteNote = {
//       Description: "This is content of new note",
//       color: "Red",
//       isArchived: true,
//       isTrash: false,
//       UserID: "user12346"
//     };
//     request(app)
//       .post('/api/v1/notes') 
//       .send(incompleteNote)
//       .end((err, res) => {
//         expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST); 
//         expect(res.body).to.have.property('message', 'Title is required');
//         done();
//       });
//   });
//   ;
// });
