import sequelize from "sequelize";
import { OrderModel, UserModel, FoodModel, Op } from "../sync/model.js";

const POST = async (req, res) => {
  try {
    const { user_id, food_id, count } = req.body;
    if (!user_id) throw new Error("you must select user");
    if (!food_id) throw new Error("you must select food");
    if (!count) throw new Error("How many foods");
    let result = await OrderModel.findOne({
      where: { user_id, food_id },
    });
    let newOrder;
    if (result) {
      let { dataValues } = result;
      newOrder = await OrderModel.update(
        { count: sequelize.literal("count + " + count) },
        { where: { order_id: dataValues.order_id } }
      );
    } else {
      newOrder = await OrderModel.create(req.body);
    }
    res.json({
      status: 200,
      massage: "order added",
      data: newOrder,
    });
  } catch (error) {
    res.json({
      status: 404,
      massage: error.massage,
    });
  }
};

const GET = async (req, res) => {
  try {
    let orders = await OrderModel.findAll({
      include: [FoodModel, UserModel],
      where: req.params || true,
    });
    console.log(orders);
    res.json(orders);
  } catch (error) {
    res.json({
      status: 404,
      massage: error.massage,
    });
  }
};

const DELETE = async (req, res) => {
  try {
    let { order_id } = req.body;
    let order = await OrderModel.destroy({ where: { order_id } });
    await res.json({
      status: 200,
      massage: "Deleted order",
      data: order,
    });
  } catch (error) {
    res.json({
      status: 400,
      massage: error.massage,
    });
  }
};

export default { POST, GET, DELETE };
