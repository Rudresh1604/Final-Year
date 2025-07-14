const router = require("express").Router();
const {
  Contacts,
  About,
  Experiences,
  Projects,
  Intro,
} = require("../models/PortfolioSchema");

const user = require("../models/userSchema");

// get portfolio data routes
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const Intros = await Intro.find();
    const Abouts = await About.find();
    const Project = await Projects.find();
    const Experience = await Experiences.find();
    const Contact = await Contacts.find();
    console.log(req.url);

    res.send([
      { intro: Intros },
      { about: Abouts },
      { experience: Experience },
      { projects: Project },
      { contact: Contact },
    ]);
  } catch (err) {
    console.log(err);
  }
});
