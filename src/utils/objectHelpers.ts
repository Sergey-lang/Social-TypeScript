export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
   return items.map((u:any) => {
      if (u[objPropName] === itemId) {
         return {...u, newObjProps}
      }
      return u
   })
}

//users-reducer
// return {
//    ...state,
//    users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
// }