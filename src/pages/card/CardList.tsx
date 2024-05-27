import React, {FC} from 'react';
import {Action, CardData} from "pages/card/cardReducer";
import './card.css'
import CardItem from "pages/card/CardItem";

interface CardListProps {
    cards: CardData[];
    handleEdit: (id: number | undefined) => void;
    dispatch: React.Dispatch<Action>;
}

const CardList: FC<CardListProps> = ({cards, handleEdit, dispatch}) => {


    return (
        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', padding: '10px', borderRadius: '10px'}}>
            {cards.map((card) => (
                <CardItem key={card.id} {...card} handleEdit={handleEdit}
                          dispatch={dispatch}/>
            ))}
        </div>
    );
}

export default CardList;