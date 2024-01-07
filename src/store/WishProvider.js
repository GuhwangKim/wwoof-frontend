import { useReducer } from "react";
import WishContext from "./wish-context";

const defaultWishState = {
    items : [],
    totalAmount: 0
}
// 3번
const wishReducer = (state, action)=>{
    if (action.type === 'ADD') {
        const updatedTotalAmount =
          state.totalAmount + action.item.price * action.item.amount;
    
        const existingWishItemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingWishItemIndex];
        let updatedItems;
    
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,
          };
          updatedItems = [...state.items];
          updatedItems[existingWishItemIndex] = updatedItem;
        } else {
          updatedItems = state.items.concat(action.item);
        }
    
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }

      if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
          updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
          const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        }
    
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount
        };
      }
    
      if (action.type === 'CLEAR') {
        return defaultWishState;
      }
    
      return defaultWishState;
}

const WishProvider = (props) => {
    const[wishState, dispatchWishAction] = useReducer(
        wishReducer, 
        defaultWishState
    );
    // 2번
    const addItemToWishHandler = (item) => {
        dispatchWishAction({ type: 'ADD', item: item });
      };
    
      const removeItemFromWishHandler = (id) => {
        dispatchWishAction({ type: 'REMOVE', id: id });
      };
    
      const clearWishHandler = () => {
        dispatchWishAction({type: 'CLEAR'});
      };
    
      // 1번 
      const cartContext = {
        items: wishState.items,
        totalAmount: wishState.totalAmount,
        addItem: addItemToWishHandler,
        removeItem: removeItemFromWishHandler,
        clearCart: clearWishHandler
      };

      return(
        <WishContext.Provider value={cartContext}> 
        {/* 4번 */}
            {props.children}
        </WishContext.Provider>
      )

}

export default WishProvider;
