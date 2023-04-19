const Case = require('../models/Case.model');
const Computer = require('../models/Computer.model');
const Cooler = require('../models/Cooler.model');
const Cpu = require('../models/Cpu.model');
const Drive = require('../models/Drive.model');
const Headphone = require('../models/Headphone.model');
const Keyboard = require('../models/Keyboard.model');
const Laptop = require('../models/Laptop.model');
const Mainboard = require('../models/Mainboard.model');
const Mouse = require('../models/Mouse.model');
const Psu = require('../models/Psu.model');
const Ram = require('../models/Ram.model');
const Screen = require('../models/Screen.model');
const Vga = require('../models/Vga.model');

const collections = [
  Case,
  Computer,
  Cooler,
  Cpu,
  Drive,
  Headphone,
  Keyboard,
  Laptop,
  Mainboard,
  Mouse,
  Psu,
  Ram,
  Screen,
  Vga,
];

const getItems = async (req, res, next) => {
  try {
    const query = req.query.q;
    const result = collections.map(async (collection) => {
      const data = await collection.find({
        title: { $regex: query, $options: 'i' },
      });
      const type = collection.modelName.toLowerCase();
      console.log([
        ...data.map((x) => ({
          ...x._doc,
          type,
        })),
      ]);
      return {
        items: [
          ...data.map((x) => ({
            ...x._doc,
            type,
          })),
        ],
      };
    });
    const promiseResult = await Promise.all(result);
    const items = promiseResult.flatMap((item) => item.items);
    res.json({
      items,
      totalItems: items.length,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getItems,
};
