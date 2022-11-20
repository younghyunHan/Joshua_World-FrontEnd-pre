import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditorStyles from './Editor.module.css';

export default function Editor() {
  return <form id={EditorStyles.EditorWrap}></form>;
}
