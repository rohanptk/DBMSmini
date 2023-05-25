import { createContext, useState } from "react";

export const BooksContext = createContext();

export const BooksProvider = (props) => {
    const [books, setBooks] = useState([]);

    return (
        <BooksContext.Provider value={[books, setBooks]}>
            {props.children}
        </BooksContext.Provider>
    )
}