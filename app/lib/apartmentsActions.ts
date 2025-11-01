'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Apartment } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ApartmentFormSchema = z.object({
  id: z.string(),
  city: z.string().min(1, { message: 'Please enter a city.' }),
  building: z.string().min(1, { message: 'Please enter a building.' }),
  apartment_number: z.string().min(1, { message: 'Please enter an apartment number.' }),
  price: z.coerce.number().gt(0, { message: 'Please enter a price greater than $0.' }),
  name: z.string().optional(),
  location: z.string().optional(),
});

const CreateApartment = ApartmentFormSchema.omit({ id: true });

export type State = {
  errors?: {
    // title?: string[];
    city?: string[];
    building?: string[];
    apartment_number?: string[];
    price?: string[];
    name?: string[];
    location?: string[];
  };
  message?: string | null;
};

export async function createApartment(prevState: State, formData: FormData) {
  console.log('🔥 createApartment вызвана!'); // ← для отладки

  const validatedFields = CreateApartment.safeParse({
    // title: formData.get('title'),
    city: formData.get('city'),
    building: formData.get('building'),
    apartment_number: formData.get('apartment_number'),
    price: formData.get('price'),
    name: formData.get('name'),
    location: formData.get('location'),
  });

  if (!validatedFields.success) {

    console.log('❌ Validation failed:', validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Apartment.',
    };
  }

  const {  city, building, apartment_number, price, name, location } = validatedFields.data;

  try {
    await sql`
      INSERT INTO apartments (city, building, apartment_number, price, name, location)
      VALUES (${city}, ${building}, ${apartment_number}, ${price}, ${name || null}, ${location || null})
    `;
    console.log('✅ Apartment created!');
  } catch (error) {
    console.error('❌ Database error:', error);
    return {
      message: 'Database Error: Failed to Create Apartment.',
    };
  }

  revalidatePath('/apartments');
  redirect('/apartments');
}

export async function getAllApartments(query?: string) {
  try {
    if (query) {
      // Поиск с фильтром
      const data = await sql`
        SELECT 
          id,
          city,
          building,
          apartment_number,
          price,
          name,
          location,
          city || ', ' || building || ', Apt ' || apartment_number as full_address
        FROM apartments
        WHERE 
          LOWER(name) LIKE ${`%${query.toLowerCase()}%`} OR
          LOWER(city) LIKE ${`%${query.toLowerCase()}%`} OR
          LOWER(location) LIKE ${`%${query.toLowerCase()}%`} OR
          LOWER(building) LIKE ${`%${query.toLowerCase()}%`}
        ORDER BY created_at DESC
      `;
      return data;
    } else {
      // Все apartments без фильтра
      const data = await sql`
        SELECT 
          id,
          city,
          building,
          apartment_number,
          price,
          name,
          location,
          city || ', ' || building || ', Apt ' || apartment_number as full_address
        FROM apartments
        ORDER BY created_at DESC
      `;
      return data;
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch apartments.');
  }
}

export async function getApartmentById(id: string) {
  try {
    const data = await sql<Apartment[]>`
      SELECT 
        id,
        city,
        building,
        apartment_number,
        price,
        name,
        location,
        city || ', ' || building || ', Apt ' || apartment_number as full_address
      FROM apartments
      WHERE id = ${id}
    `;

    return data[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch apartment.');
  }
}

export async function deleteApartmentById(id: string) {
   try {
    const data = await sql<Apartment[]>`
    DELETE FROM apartments
    WHERE id = ${id}

    `
   } catch (error) {
     console.error('Database Error:', error);
    throw new Error('Failed to delete apartment.');
   } 
}


export async function addApartmentToFavorites(apartmentId: string) {
  try {
    await sql`
      INSERT INTO favorites (apartment_id)
      VALUES (${apartmentId})
      ON CONFLICT (apartment_id) DO NOTHING
    `;
    
    revalidatePath('/apartments');
    revalidatePath('/favorites');
    
    console.log('✅ Apartment added to favorites!');
    return { success: true };
  } catch (error) {
    console.error('❌ Database Error:', error);
    return { success: false, error: 'Failed to add to favorites' };
  }
}

export async function removeApartmentFromFavorites(apartmentId: string) {
  try {
    await sql`
      DELETE FROM favorites
      WHERE apartment_id = ${apartmentId}
    `;
    
    revalidatePath('/apartments');
    revalidatePath('/favorites');
    
    console.log('✅ Apartment removed from favorites!');
    return { success: true };
  } catch (error) {
    console.error('❌ Database Error:', error);
    return { success: false, error: 'Failed to remove from favorites' };
  }
}

export async function isFavorite(apartmentId: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT id FROM favorites 
      WHERE apartment_id = ${apartmentId}
    `;
    return result.length > 0;
  } catch (error) {
    console.error('❌ Database Error:', error);
    return false;
  }
}

export async function getFavoritesCount(): Promise<number> {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM favorites
    `;
    
    console.log('📊 Favorites count:', result[0].count); // ← для дебага
    
    return parseInt(result[0].count);
  } catch (error) {
    console.error('❌ Error getting favorites count:', error);
    return 0;
  }
}

export async function getFavoriteApartments() {
  try {
    const data = await sql`
      SELECT 
        a.id,
        a.city,
        a.building,
        a.apartment_number,
        a.price,
        a.name,
        a.location
      FROM apartments a
      INNER JOIN favorites f ON a.id = f.apartment_id
      ORDER BY f.created_at DESC
    `;
    return data;
  } catch (error) {
    console.error('❌ Database Error:', error);
    return [];
  }
}


export async function updateApartment(prevState: State, formData: FormData) {
  console.log('🔥 updateApartment вызвана!'); // ← для отладки

  const validatedFields = ApartmentFormSchema.safeParse({
    id: formData.get('id'),
    city: formData.get('city'),
    building: formData.get('building'),
    apartment_number: formData.get('apartment_number'),
    price: formData.get('price'),
    name: formData.get('name'),
    location: formData.get('location'),
  });

  if (!validatedFields.success) {
    console.log('❌ Validation failed:', validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Apartment.',
    };
  }

  const { id, city, building, apartment_number, price, name, location } = validatedFields.data;

  try {
    await sql`
      UPDATE apartments
      SET city = ${city},
          building = ${building},
          apartment_number = ${apartment_number},
          price = ${price},
          name = ${name || null},
          location = ${location || null}
      WHERE id = ${id}
    `;
    console.log('✅ Apartment updated!');
  } catch (error) {
    console.error('❌ Database error:', error);
    return {
      message: 'Database Error: Failed to Update Apartment.',
    };
  }

  revalidatePath('/apartments');
  redirect('/apartments');
}
