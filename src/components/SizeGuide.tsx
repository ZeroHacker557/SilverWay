import './SizeGuide.css';

interface SizeGuideProps {
    onClose: () => void;
}

export default function SizeGuide({ onClose }: SizeGuideProps) {
    return (
        <div className="size-guide-overlay" onClick={onClose}>
            <div className="size-guide-modal" onClick={e => e.stopPropagation()}>
                <div className="size-guide-header">
                    <h3 className="silver-text">O'lchamlar Jadvali</h3>
                    <button className="size-guide-close" onClick={onClose}>✕</button>
                </div>
                <div className="size-guide-content">
                    <p>
                        O'z o'lchamingizni aniqlash uchun barmoq yoki bilak atrofini ip bilan o'lchang,
                        so'ng quyidagi jadvaldan mos o'lchamni tanlang.
                    </p>

                    <table className="size-table">
                        <thead>
                            <tr>
                                <th>O'lcham</th>
                                <th>Diametr (mm)</th>
                                <th>Atrofi (mm)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>15</td><td>15.0</td><td>47.1</td></tr>
                            <tr><td>16</td><td>16.0</td><td>50.3</td></tr>
                            <tr><td>17</td><td>17.0</td><td>53.4</td></tr>
                            <tr><td>18</td><td>18.0</td><td>56.5</td></tr>
                            <tr><td>19</td><td>19.0</td><td>59.7</td></tr>
                            <tr><td>20</td><td>20.0</td><td>62.8</td></tr>
                            <tr><td>21</td><td>21.0</td><td>66.0</td></tr>
                        </tbody>
                    </table>

                    <div className="size-tip">
                        <span className="size-tip-icon">💡</span>
                        <p>
                            Agar ikki o'lcham orasida bo'lsangiz, kattaroq o'lchamni tanlashni tavsiya etamiz.
                            Batafsil ma'lumot uchun biz bilan bog'laning.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
