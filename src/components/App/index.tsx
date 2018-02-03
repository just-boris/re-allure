import * as React from "react";

export default function App() {
    return <div>
        {window.allure.api.getTabs().map(tabConfig => <p>
            {tabConfig.title}
        </p>)}
    </div>
}
