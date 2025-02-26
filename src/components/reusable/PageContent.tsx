import React from 'react';
import Footer from "./Footer";
import Header from "./Header";

const PageContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    );
}

export default PageContent;