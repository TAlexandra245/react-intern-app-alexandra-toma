export interface CardData {
    id?: number;
    title: string;
    description: string;
}

export interface Action {
    type: 'ADD_CARD' | 'UPDATE_CARD' | 'DELETE_CARD'
    payload: CardData | Update;
}

export interface Update {
    id?: number;
    updates?: CardData;
}

export interface State {
    cards: CardData[];
}

export const cardReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_CARD': {
            return {
                ...state,
                cards: [...state.cards, action.payload as CardData]
            }
        }
        case 'UPDATE_CARD': {
            const {id, updates} = action.payload as Update;
            return {
                ...state,
                cards: state.cards.map((card) => {
                    if (card.id === id) {
                        return {
                            ...card,
                            ...updates
                        };
                    }
                    return card;
                })
            }
        }
        case 'DELETE_CARD': {
            const {id} = action.payload;
            return {
                ...state,
                cards: state.cards.filter((card) => card.id !== id)
            };
        }
        default:
            return state;
    }
};