'use client';

import { useActionState } from 'react';
import { createApartment } from '@/app/lib/apartmentsActions';

export default function CreateApartmentForm() {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createApartment, initialState);

  return (
    <form action={formAction} className="max-w-lg w-full">
      <div className="space-y-4">
       
        <div>
          <label htmlFor="city">City</label>
          <input 
            id="city"
            name="city" 
            type="text" 
            required 
            className="w-full border rounded px-3 py-2"
          />
          {state.errors?.city && (
            <p className="text-red-500 text-sm">{state.errors.city[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="name">Name (optional)</label>
          <input 
            id="name"
            name="name" 
            type="text" 
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="building">Building</label>
          <input 
            id="building"
            name="building" 
            type="text" 
            required 
            className="w-full border rounded px-3 py-2"
          />
          {state.errors?.building && (
            <p className="text-red-500 text-sm">{state.errors.building[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="apartment_number">Apartment Number</label>
          <input 
            id="apartment_number"
            name="apartment_number" 
            type="text" 
            required 
            className="w-full border rounded px-3 py-2"
          />
          {state.errors?.apartment_number && (
            <p className="text-red-500 text-sm">{state.errors.apartment_number[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input 
            id="price"
            name="price" 
            type="number" 
            step="0.01" 
            required 
            className="w-full border rounded px-3 py-2"
          />
          {state.errors?.price && (
            <p className="text-red-500 text-sm">{state.errors.price[0]}</p>
          )}
        </div>


        <div>
          <label htmlFor="location">Location (optional)</label>
          <input 
            id="location"
            name="location" 
            type="text" 
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {state.message && (
          <p className="text-red-500">{state.message}</p>
        )}

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Apartment
        </button>
      </div>
    </form>
  );
}