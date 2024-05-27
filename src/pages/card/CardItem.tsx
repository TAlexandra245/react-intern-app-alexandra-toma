import React, {FC} from "react";
import {Action, CardData} from "pages/card/cardReducer";
import card from "pages/card/Card";
import './card.css'
interface ExtraProps {
    handleEdit: (id: number | undefined) => void;
    dispatch: React.Dispatch<Action>;
}

const CardItem: FC<CardData & ExtraProps> = ({id, title, description, dispatch, handleEdit}) => {
    return (
        <div style={{
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '2px 16px', display: 'inline-block', wordBreak: 'break-all'
        }}>
            <h1>{title}</h1>
            <p> {description}</p>
            <button onClick={() => handleEdit(id)}
                    style={{background: 'lightblue', padding: '5px', margin: '0 auto'}}> Edit Item
            </button>
            <button onClick={() => {
                const confirmDelete = window.confirm(`Are you sure you want to delete card ${title} ?`);
                if (confirmDelete) {
                    dispatch({
                        type: 'DELETE_CARD',
                        payload: {
                            id,
                            ...card
                        }
                    })
                }
            }} className = 'delete-button'> Delete card
            </button>
        </div>
    )
}

export default CardItem;