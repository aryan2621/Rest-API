const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscribers");

router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
router.patch("/:id", getSubscriber, (req, res) => {



});
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.delete()
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "FAIL" });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subscriber = subscriber;
  next();
}

module.exports = router;
