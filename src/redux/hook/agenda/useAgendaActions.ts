import { contacto } from "../../../components/contactos/model/contacto";
import {
    addItem,
    deleteItem,
    updateItem,
    resetItem,
    addAllItem,
} from "../../store/slices/agenda.slice";
import { useAppDispatch } from "../useStore";

export const useAgendaActions = () => {
    const dispatch = useAppDispatch();

    const agregarTodos = (agenda: contacto[]) => {
        dispatch(addAllItem(agenda));
    };

    const agregar = (agenda: contacto) => {
        dispatch(addItem(agenda));
    };

    const eliminar = (agendaId: number) => {
        dispatch(deleteItem(agendaId));
    };

    const actualizar = (agenda: contacto) => {
        dispatch(updateItem(agenda));
    };

    const resetear = () => {
        dispatch(resetItem());
    };

    return {
        agregar,
        eliminar,
        actualizar,
        resetear,
        agregarTodos,
    };
};
