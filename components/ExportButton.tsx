import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export default function ExportButton() {
  const exportOrders = async () => {
    const snapshot = await getDocs(collection(db, 'orders'));
    const orders = snapshot.docs.map((doc) => doc.data());

    const csv = Papa.unparse(orders);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'orders.csv');
  };

  return (
    <button
      onClick={exportOrders}
      className="bg-[#457b6e] text-white px-4 py-2 rounded hover:bg-[#2f554c]"
    >
      🧾 Export Orders (CSV)
    </button>
  );
}
