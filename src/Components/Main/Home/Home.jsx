import React from "react";
import BlockCreator from "./BlockCreator/BlockCreator";
import './home.css'
import uniqid from "uniqid";

export default function Home() {
    function blocksCreate(blocksItem = []) {
        const blocks = [];
        for(let i = 0; i < blocksItem.length; i++) {
            blocks.push(
                <BlockCreator par = {blocksItem[i]} name={blocksItem[i]}/>
            );
        }
        return blocks;
    }

    return(
        <div key={uniqid()} className={'home'}>
            {blocksCreate(['week'])}
            <div key={uniqid()} className='block__withButtons'>
                {blocksCreate(['journal'])}
                <div key={uniqid()} className='block__professorsAndSchedule'>
                    {blocksCreate(['professors', 'schedule'])}
                </div>
            </div>
        </div>
    )
}