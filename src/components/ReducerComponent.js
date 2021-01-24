
const ReducerComponent = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload];
        break;

        case 'delete': 
            return state.filter((todo) => todo.id !== action.payload);
        break;

        case 'toggle': 
            return state.map((todo) => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        done: !todo.done
                    };
                } else {
                    return todo;
                }
            })
        break;
        
        default:
            return state;
        break;
    }
}

export default ReducerComponent;