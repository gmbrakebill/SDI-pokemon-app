import React from 'react';

function QueryButton(props) {
  return (
    //get form to query what user is looking for??
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        onChange={props.onChange}
        className="searchpoke"
        placeholder="Search..."
      />
      <input type="submit" value="Search Pokemon" />
    </form>
  );
}
export default QueryButton;
