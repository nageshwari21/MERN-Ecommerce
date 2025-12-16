import { Cart } from "../Models/Cart.js";

/**
 * ADD TO CART
 */
export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty, imgSrc } = req.body;
    const userId = req.user._id;

    // find user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // create new cart
      cart = new Cart({
        userId,
        items: [{ productId, title, price, qty, imgSrc }],
      });
    } else {
      // check if product already exists
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].qty += qty;
      } else {
        cart.items.push({ productId, title, price, qty, imgSrc });
      }
    }

    await cart.save();

    res.status(200).json({
      message: "Item added to cart ✅",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add item ❌" });
  }
};

/**
 * DECREASE QTY
 */
export const decreaseQty = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found ❌" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found ❌" });

    if (cart.items[itemIndex].qty > 1) {
      cart.items[itemIndex].qty -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.json({ message: "Quantity updated ✅", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * REMOVE FROM CART
 */
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found ❌" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json({ message: "Item removed ✅", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
