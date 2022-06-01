import React from 'react';

const CommandsTable = (props) => {

  const handleDelete = (commandId) => {
    fetch(`/commands/${commandId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if(data.success == true) return window.location.assign('/commands');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className={`${props.title} p-8 flex flex-col flex-wrap justify-center items-center`}>
      <h2 className="font-main text-white font-bold text-center text-2xl">{props.title}</h2>
      <div className="flex justify-center items-center flex-wrap">
        {props.rows.map((row) => {
          return (
            <div className="mt-6 ml-4 pt-4 pb-4 pr-20 pl-8 border-2 border-solid border-zinc-300 rounded-2xl bg-zinc-700" key={row.id}>
              <p className="font-main text-base text-white">{row.name}</p>
              <p className="font-main text-xs text-white">{row.description}</p>
              <div className="pt-3.5">
                <p className="font-main text-xs text-zinc-300"><span className="font-bold text-white">Usage:</span> {row.usage}</p>
                <p className="font-main text-xs text-zinc-300"><span className="font-bold text-white">Aliases:</span> {row.aliases.join(', ')}</p>
              </div>
              {props.user && props.user.userID == process.env.ownerID &&
                <div className="font-main flex-col text-xs text-zinc-300 flex pt-3 justify-start shinobu-commands-card-links">
                  <a href={`/commands/${row.id}/edit`} className="font-main text-white text-xs">Edit</a>
                  <a href='#' onClick={(e) => {
                    e.preventDefault();
                    handleDelete(row.id);
                  }} className="font-main text-white text-xs">Delete</a>
                </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommandsTable;
