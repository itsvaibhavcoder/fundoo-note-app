import { expect, use } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
import App from '../../src/index';
import dotenv from 'dotenv';
dotenv.config({ path: 'process.env.DATABASE_TEST' });

let jwtToken: string;
const app = App.getApp();

describe('User APIs Test', () => {
  before(async () => {
    await mongoose.connect(process.env.DATABASE_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  describe('POST /api/v1/users/register', () => {
    it('should return status 201 when a new user is added', async () => {
      const userdetails = {
        fName: 'Vaibhav',
        lName: 'Sukale',
        email: 'vaibhavsukale9449',
        password: 'vaibhav@123'
      };
      console.log(userdetails.email);

      try {
        const res = await request(app)
          .post('/api/v1/users/register')
          .send(userdetails)
          .expect(HttpStatus.CREATED);

        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('email', userdetails.email);
      } catch (error) {
        console.error('Error during the test:', error);
      }
    });
  });

  describe('POST /api/v1/users/login', () => {
    it('should return status 200 for valid login', async () => {
      const userdetails = {
        email: 'vaibhavsukale9449@gmail.com',
        password: 'vaibhav@123'
      };
      try {
        const response = await request(app)
          .post('/api/v1/users/login')
          .send(userdetails)
          .expect(HttpStatus.OK);
        jwtToken = response.body.token;
        expect(jwtToken).to.be.a('string');
      } catch (error) {
        console.error('Error during the test:', error);
      }
    });
  });

  describe('POST /api/v1/notes', () => {
    it('should return status 200 when a note is created', async () => {
      const noteDetails = {
        Title: 'Note Title',
        Dest: 'This is note',
        color: 'black'
      };
      await request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(noteDetails)
        .expect(HttpStatus.OK);
    });
  });

  // Test case for getting a note by ID
  describe('GET /api/v1/notes/:id', () => {
    it('should return status 200 and the note when a valid ID is provided', async () => {
      const noteId = ''; 
      const response = await request(app)
        .get(`/api/v1/notes/${noteId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(HttpStatus.OK);
        
      expect(response.body).to.have.property('_id', noteId); // Ensure the returned note has the correct ID
      expect(response.body).to.have.property('Title'); // Ensure the returned note has a title
    });

    it('should return status 404 when the note ID is not found', async () => {
      const invalidNoteId = 'bbhuihjn90868747';
      await request(app)
        .get(`/api/v1/notes/${invalidNoteId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  // Test case for deleting a note by ID
  describe('DELETE /api/v1/notes/:id', () => {
    it('should return status 200 when a note is deleted successfully', async () => {
      const noteId = ''; 
      await request(app)
        .delete(`/api/v1/notes/${noteId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(HttpStatus.OK); 

      await request(app)
        .get(`/api/v1/notes/${noteId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return status 404 when the note ID is not found for deletion', async () => {
      const invalidNoteId = 'ghg8976h56879';
      await request(app)
        .delete(`/api/v1/notes/${invalidNoteId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(HttpStatus.NOT_FOUND); 
    });
  });

  // Test case for updating a note by ID
  describe('PUT /api/v1/notes/:id', () => {
    it('should return status 200 and update the note when a valid ID is provided', async () => {
      const noteId = ''; 
      const updatedNoteDetails = {
        Title: 'Updated Note Title',
        Dest: 'Updated note description',
        color: 'blue'
      };

      const response = await request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(updatedNoteDetails)
        .expect(HttpStatus.OK);

      expect(response.body).to.have.property('_id', noteId);
      expect(response.body).to.have.property('Title', updatedNoteDetails.Title); 
      expect(response.body).to.have.property('color', updatedNoteDetails.color); 
    });

    it('should return status 404 when the note ID is not found for update', async () => {
      const invalidNoteId = 'nonexistent-id';
      const updatedNoteDetails = {
        Title: 'Updated Note Title',
        Dest: 'Updated note description',
        color: 'blue'
      };

      await request(app)
        .put(`/api/v1/notes/${invalidNoteId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(updatedNoteDetails)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
