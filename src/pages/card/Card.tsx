import React, {ChangeEvent, FC, FormEvent, useState} from "react";
import {Action, CardData} from "pages/card/cardReducer";
import './card.css'

interface CardFormProps {
    dispatch: React.Dispatch<Action>;
    dataToEdit: CardData | undefined;
    toggleModal: () => void;
}

const Card: FC<CardFormProps> = ({dispatch, dataToEdit, toggleModal}) => {

    const [cards, setCards] = useState<CardData[]>([]);
    const [card, setCard] = useState<{
        title: string,
        description: string
    }>({
        title: dataToEdit?.title ? dataToEdit?.title : '',
        description: dataToEdit?.description ? dataToEdit?.description : ''
    })

    function handleOnChange(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        setCard({
            title: formData.get('title') as string,
            description: formData.get('description') as string,
        })

        if (!dataToEdit) {
            dispatch({
                type: 'ADD_CARD',
                payload: {
                    id: Date.now(), // returns current timestamp
                    ...card
                }
            });
            setCard({
                title: '',
                description: '',
            });
        } else {
            dispatch({
                type: 'UPDATE_CARD',
                payload: {
                    id: dataToEdit.id,
                    updates: {
                        id: Date.now(),
                        ...card
                    }
                }
            });
            toggleModal();
        }
    }

    function handleInputChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setCard({
            ...card,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div>
            <form onSubmit={handleOnChange} style = {{display: 'flex', flexDirection:'column', maxWidth: '300px', justifyContent: 'center'}}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={card.title}
                        maxLength={25}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <textarea
                        id="description"
                        name="description"
                        style = {{resize: 'none'}}
                        value={card.description}
                        maxLength = {255}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">  {dataToEdit ? 'Update Card' : 'Add Card'} </button>
            </form>
        </div>
    )
}

export default Card;