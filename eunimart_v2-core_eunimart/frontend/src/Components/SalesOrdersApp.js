import { mount } from 'SalesOrder/Sales'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current)
        history.listen(onParentNavigate)
    }, [])

    return <div ref={ref} />
}