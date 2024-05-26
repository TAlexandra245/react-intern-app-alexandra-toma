import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import {Action, CardData, State} from "pages/card/cardReducer";
import './card.css'
import Modal from "pages/modal/Modal";
import Card from "pages/card/Card";
import CardItem from "pages/card/CardItem";

interface CardListProps {
    cards: CardData[];
    handleEdit: (id: number | undefined) => void;
    dispatch: React.Dispatch<Action>;
}

const CardList: FC<CardListProps> = ({cards, handleEdit, dispatch}) => {


    return (
        <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
            {cards.map((card) => (
                <CardItem key={card.id} {...card} handleEdit={handleEdit}
                          dispatch={dispatch}/>
            ))}
        </div>
    );
}

export default CardList;