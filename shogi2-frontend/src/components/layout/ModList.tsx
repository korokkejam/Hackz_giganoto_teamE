import { useState, useEffect } from "react";
import "./styles/ModList.css";

export default function ModList() {
    const [directories, setDirectories] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/mods/list')
            .then(response => {
                if (!response.ok) {
                    throw new Error('サーバーレスポンスエラー');
                }
                return response.json();
            })
            .then(data => {
                setDirectories(data.filter((dir: string) => dir !== 'base'))
            })
            .catch(error => {
                console.error('Modsデータ取得エラー:', error);
                setError('ディレクトリ情報の取得に失敗しました');
            });
    }, []);

    return (
        <div className="mod-list">
            <p>Mods ディレクトリ一覧</p>
            {error && <p className="error-message">{error}</p>}
            <div className="windowBox">
            <ul>
                {directories.map((dir, index) => (
                    <li key={index} className="mod-directory">
                        <a
                            href={dir}
                            onClick={(e) => {
                                e.preventDefault();
                                window.open({dir} + ".ts", '_blank', 'width=300,height=300');
                            }}
                        >{dir}</a>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}