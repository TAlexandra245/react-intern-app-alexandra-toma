import React, {useEffect, useReducer, useState} from "react";
import Card from "pages/card/Card";
import {CardData, cardReducer, State} from "pages/card/cardReducer";
import CardList from "pages/card/CardList";
import Modal from "pages/modal/Modal";

const initialState: State = {
    cards: []
};

const Home = () => {

    const [state, dispatch] = useReducer(cardReducer, initialState);
    const [showModal, setShowModal] = useState(false);
    const [dataToEdit, setDataToEdit] = useState<CardData | undefined>(undefined);

    useEffect(() => {
        if (!showModal) {
            setDataToEdit(undefined);
        }
    }, [showModal]);
    const toggleModal = () => {
        setShowModal((show) => !show);
    };
    const handleEdit = (id: number | undefined) => {
        setDataToEdit(state.cards.find((card) => card.id === id));
        toggleModal();
    };


    return (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '90vh',
                width: '100%',
            }}
        >
            <h1>Welcome!</h1>
            <div>
                <Card dispatch={dispatch} dataToEdit={dataToEdit} toggleModal={toggleModal}/>
            </div>
            <hr/>
            {state.cards.length > 0 && <CardList cards={state.cards} handleEdit={handleEdit} dispatch={dispatch}/>}
            <Modal show={showModal} onClose={toggleModal} dispatch={dispatch}>
                <Card dispatch={dispatch} dataToEdit={dataToEdit} toggleModal={toggleModal}/>
            </Modal>
        </div>

    )
};

export default Home;
