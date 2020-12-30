const request = require("supertest");
const mongoose = require('mongoose');
const app = require('../../express')();

const AlbumModel = require('../../models/album.model')
const TrackModel = require('../../models/track.model')
const ArtistModel = require('../../models/artist.model')

let artist;
let server;
let record = {
  title: 'sample title',
  release_date: Date.now() / 1000,
};

describe("End points", () => {
  beforeEach(async () => {
    const application = require("../../application")
    server = await application(app, mongoose, 5000)
    await dataToModel()
    record.artist = artist._id;
  });

  afterEach(async () => {
    await server.close()
    await AlbumModel.remove({})
    await TrackModel.remove({})
    await ArtistModel.remove({})
  });

  it("should return 400 for invalid input when creating album", async () => {
    const res = await request(server).post("/album").send({});
    expect(res.status).toBe(400);
  });

  it("should return 200 for valid input when creating album", async () => {
    const res = await request(server).post("/album").send(record);
    expect(res.status).toBe(200);
  });

  it("should return 500 for duplicate record", async () => {
    await request(server).post("/album").send(record);
    const res = await request(server).post("/album").send(record);
    expect(res.status).toBe(500);
  });

  it("should return 200 if album exist", async () => {
    const albumResp = await request(server).post("/album").send(record);
    const res = await request(server)
      .get(`/album/${albumResp.body.data._id}`).send();
    expect(res.status).toBe(200);
  });

  it("status should be 404 if album does not exit", async () => {
    const res = await request(server)
      .get(`/album/5fcbf46161fc5b0011172255`).send();
    expect(res.status).toBe(404);
  });

  it("status should be 200 if record exit", async () => {
    const albumResp = await request(server).post("/album").send(record);
    const res = await request(server)
      .patch(`/album/${albumResp.body.data._id}`).send({
        description: 'some random text to represent the description of an album'
      });
    expect(res.status).toBe(200);
  });

  it("status should be 500 if update is performed on record that does not exist", async () => {
    const albumResp = await request(server).post("/album").send(record);
    const res = await request(server)
      .patch(`/album/5fcbf46161fc5b0011172255}`).send({
        description: 'some random text to represent the description of an album'
      });
    expect(res.status).toBe(500);
  });

  it("status should be 200 delete successful", async () => {
    const albumResp = await request(server).post("/album").send(record);
    const res = await request(server)
      .delete(`/album/${albumResp.body.data._id}`).send();
    expect(res.status).toBe(200);
  });

  it("status should be 404 if delete", async () => {
    const albumResp = await request(server).post("/album").send(record);
    const res = await request(server)
      .delete(`/album/5fcbf46161fc5b0011172255`).send();
    expect(res.status).toBe(404);
  });

  it("status should be 200 if create track sucessful", async () => {
    const res = await request(server).post("/track").send(record);
    expect(res.status).toBe(200);
  });

  it("status should be 404 if track is added to album sucessfully", async () => {
    const albumResp = await request(server).post("/album").send(record);
    const res = await request(server)
      .patch(`/album/${albumResp.body.data._id}/track/5fcbf46161fc5b0011172255`).send();
    expect(res.status).toBe(404);
  });

  it("status should be 200 if track is added to album sucessfully", async () => {
    const albumResp = await request(server).post("/album").send(record);
    const trackResp = await request(server).post("/track").send(record);
    const res = await request(server)
      .patch(`/album/${albumResp.body.data._id}/track/${trackResp.body.data._id}`).send();
    expect(res.status).toBe(200);
  });

  it("status should be 200 if track exist in album", async () => {
    const albumResp = await request(server).post("/album").send(record);
    const trackResp = await request(server).post("/track").send(record);
    await request(server)
      .patch(`/album/${albumResp.body.data._id}/track/${trackResp.body.data._id}`).send();

    const res = await request(server)
      .get(`/album/${albumResp.body.data._id}/tracks`).send();
    expect(res.status).toBe(200);
  });

  it("status should be 404 if track does not exist in album", async () => {
    const albumResp = await request(server).post("/album").send(record);
    const res = await request(server)
      .get(`/album/${albumResp.body.data._id}/tracks`).send();
    expect(res.status).toBe(404);
  });

  it("status should be 200 delete track successful", async () => {
    const trackResp = await request(server).post("/track").send(record);
    const res = await request(server)
      .delete(`/track/${trackResp.body.data._id}`).send();
    expect(res.status).toBe(200);
  });

  it("status should be 404 if delete operation is done non existing track", async () => {
    const res = await request(server)
      .delete(`/track/5fcbf46161fc5b0011172255`).send();
    expect(res.status).toBe(404);
  });

  it("status should be 200 if remove track from album operation sucessful", async () => {
    const albumResp = await request(server).post("/album").send(record);
    const trackResp = await request(server).post("/track").send(record);
    await request(server).patch(`/album/${albumResp.body.data._id}/track/${trackResp.body.data._id}`).send();

    const res = await request(server).patch(`/track/${trackResp.body.data._id}`).send();
    expect(res.status).toBe(200);
  });

  it("status should be 404 if remove track from album fail due not track not found", async () => {
    const res = await request(server).patch(`/track/5fcbf46161fc5b0011172255`).send();
    expect(res.status).toBe(404);
  });
});

async function dataToModel() {
  try {
    artist = await ArtistModel
      .create({ name: 'Travis Scot' });
  } catch (error) { }
}
