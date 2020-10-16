const chai = require('chai');
const { expect } = require('chai');
const mongoUnit = require('mongo-unit');
const { Note } = require("../models/Note");
const mongoose = require("mongoose");
const chaiHttp = require('chai-http');
const app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();
chai.expect();

describe("Note", () => {
  before(async () => {
    await mongoose.disconnect(); // Disconnect from mongo the App is using
    mongoose.connect(mongoUnit.getUrl()); // Connect to dummy mongodb for testing
    mongoUnit.initDb(mongoUnit.getUrl(), {
      "notes": [
        {
          "title": "Test Note",
          "type": "Test",
          "task": "Testing task"
        }
      ]
    });
  });
  after(() => mongoUnit.drop());
  describe("GET /", () => {
    // Test to get all notes
    it("should get all notes", (done) => {
      chai
        .request(app)
        .get("/note/getAll")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("POST /", () => {
    // Test to create a note
    it("create a note", (done) => {
      chai
        .request(app)
        .post("/note/create")
        .type('json')
        .send({
          "title": "Test Note 1",
          "type": "Test",
          "task": "Testing task"
        })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.success).to.equal(true);
          res.body.should.have.property('note');
          done();
        });
    });
  });
  describe("UPDATE /", () => {
    let noteId = "";
    before(async () => {
      let note = await Note.findOne();
      noteId = note._id;
    })
    // Test to update a note
    it("should update a note", (done) => {
      chai
        .request(app)
        .put("/note/update")
        .send({
          "noteId": noteId,
          "note": {
            "title": "Test Note 5",
            "type": "Test",
            "task": "Testing task"
          }
        })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.success).to.equal(true);
          res.body.should.have.property('note');
          done();
        });
    });
  });
  describe("DELETE /", () => {
    let noteId = "";
    before(async () => {
      let note = await Note.findOne();
      noteId = note._id;
    })
    // Test to delete note
    it("should delete the specified note", (done) => {
      chai
        .request(app)
        .delete("/note/delete")
        .send({
          "noteId": noteId
        })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });
});
