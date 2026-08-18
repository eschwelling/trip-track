class AddPerformanceIndexes < ActiveRecord::Migration[7.1]
  def up
    # Looked up by mbta_id when resolving MBTA API ids to local records.
    add_index :stops, :mbta_id
    add_index :lines, :mbta_id

    # Every visit to a journey page re-saved the same predicted trips, so this
    # table grew without bound. Collapse the duplicates (the trips API already
    # hid them behind DISTINCT ON at read time) and keep them out from now on.
    execute <<~SQL
      DELETE FROM trips a
      USING trips b
      WHERE a.id > b.id
        AND a.journey_id = b.journey_id
        AND a.arrival = b.arrival
        AND a.departure = b.departure
    SQL

    add_index :trips, %i[journey_id arrival departure],
              unique: true, name: "index_trips_on_journey_id_and_arrival_and_departure"
  end

  def down
    remove_index :trips, name: "index_trips_on_journey_id_and_arrival_and_departure"
    remove_index :lines, :mbta_id
    remove_index :stops, :mbta_id
  end
end
