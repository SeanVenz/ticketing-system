function Button({onClick, css, type, children, disabled, types}) {

    let btnDesign;

    if(type === 'primary'){
        btnDesign = 'bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded flex items-center'
    }else if(type === 'secondary'){
        btnDesign = 'px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
    } else if(type === 'tertiary'){
        btnDesign = 'px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2'
    }

  return (
    <button type={types} disabled={disabled} onClick={() => onClick()} className={`${css} ${btnDesign} cursor-pointer` }>{children}</button>
  )
}

export default Button