import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

// Funktion mit der ein Bild hochgeladen werden kann
export async function POST(req: NextRequest) {
	/*   try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const fileName = file;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    await fs.mkdir(path.join(process.cwd(), 'public', 'uploads'), { recursive: true });
    await fs.writeFile(filePath, Buffer.from(buffer));

    return NextResponse.json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  } */
}
